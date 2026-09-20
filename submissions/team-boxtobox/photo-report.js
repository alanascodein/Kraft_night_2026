// Photo-based crop report: pick photo -> clean -> upload -> AI reads it -> farmer confirms -> save.
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

// Supabase Dashboard > Project Settings > API.
// The anon key is a public key. It is safe here because row-level security protects the data.
// NEVER put the OpenAI key in this file.
const SUPABASE_URL = "https://YOUR-PROJECT.supabase.co";
const SUPABASE_ANON_KEY = "YOUR-ANON-KEY";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const MAX_INPUT_BYTES = 15 * 1024 * 1024; // reject huge originals
const MAX_SIDE = 1024;                    // resized photo: small, cheap, fast

const $ = (id) => document.getElementById(id);
const el = {
  photo: $("photo"),
  preview: $("photo-preview"),
  description: $("description"),
  analyze: $("analyze-btn"),
  status: $("photo-status"),
  form: $("report-form"),
  crop: $("crop"),
  part: $("part"),
  symptoms: $("symptoms"),
  severity: $("severity"),
  area: $("area"),
  save: $("save-btn"),
};

const current = { photoPath: null, aiResult: null };

function setStatus(message) {
  el.status.textContent = message;
}

function setBusy(busy) {
  el.analyze.disabled = busy;
  el.save.disabled = busy;
}

// Redrawing the photo on a canvas strips EXIF data, including GPS location.
async function prepareImage(file) {
  if (!file.type.startsWith("image/")) throw new Error("Choose an image file, like a JPG or PNG.");
  if (file.size > MAX_INPUT_BYTES) throw new Error("That photo is over 15 MB. Choose a smaller one.");

  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Could not process the photo."))),
      "image/jpeg",
      0.85,
    ),
  );
}

async function functionErrorMessage(error) {
  try {
    const body = await error.context.json();
    return body.error;
  } catch {
    return null;
  }
}

function fillForm(r) {
  const clear = r.is_crop_photo && r.photo_quality === "clear";
  setStatus(
    clear
      ? "Check the details below and fix anything that is wrong."
      : "The photo is not clear enough. Retake it in daylight and closer to the affected part, or fill in the form yourself.",
  );
  el.crop.value = r.crop ?? "";
  el.part.value = r.affected_part ?? "";
  el.symptoms.value = (r.visible_symptoms ?? []).join(", ");
  el.severity.value = ["mild", "moderate", "severe"].includes(r.severity) ? r.severity : "";
}

// Show a preview when a photo is chosen.
el.photo.addEventListener("change", () => {
  const file = el.photo.files[0];
  if (!file) return;
  if (el.preview.src) URL.revokeObjectURL(el.preview.src);
  el.preview.src = URL.createObjectURL(file);
  el.preview.hidden = false;
});

// Upload, then ask the server function to read the photo.
el.analyze.addEventListener("click", async () => {
  const file = el.photo.files[0];
  if (!file) return setStatus("Choose or take a photo first.");

  setBusy(true);
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Sign in to send a photo report.");

    setStatus("Preparing photo...");
    const blob = await prepareImage(file);

    setStatus("Uploading photo...");
    const path = `${user.id}/${crypto.randomUUID()}.jpg`;
    const { error: upErr } = await supabase.storage
      .from("crop-photos")
      .upload(path, blob, { contentType: "image/jpeg" });
    if (upErr) throw new Error("Upload failed. Check your connection and try again.");
    current.photoPath = path;

    setStatus("Reading photo...");
    const { data, error } = await supabase.functions.invoke("extract-crop-report", {
      body: { path, note: el.description.value },
    });
    if (error || !data?.result) {
      throw new Error((await functionErrorMessage(error)) ?? "Photo reading failed.");
    }
    current.aiResult = data.result;
    fillForm(data.result);
  } catch (err) {
    // The form still opens, so the farmer can always finish the report by hand.
    setStatus(`${err.message} You can fill in the form yourself.`);
  } finally {
    el.form.hidden = false;
    setBusy(false);
  }
});

// Save what the FARMER confirmed. The raw AI output is kept alongside for officers.
el.form.addEventListener("submit", async (event) => {
  event.preventDefault();
  setBusy(true);
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Sign in to save your report.");

    const { error } = await supabase.from("farmer_reports").insert({
      farmer_id: user.id,
      photo_path: current.photoPath,
      ai_extracted: current.aiResult,
      crop: el.crop.value.trim(),
      affected_part: el.part.value || null,
      symptoms: el.symptoms.value.split(",").map((s) => s.trim()).filter(Boolean),
      severity: el.severity.value || null,
      description: el.description.value.trim() || null,
      area: el.area.value.trim(),
    });
    if (error) throw new Error("Could not save the report. Try again.");

    setStatus("Report saved. An officer will review it.");
    el.form.reset();
    el.form.hidden = true;
    current.photoPath = null;
    current.aiResult = null;
  } catch (err) {
    setStatus(err.message);
  } finally {
    setBusy(false);
  }
});
