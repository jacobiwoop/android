import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Geolocation } from "@capacitor/geolocation";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

export const NativeService = {
  async takePhoto() {
    const isNative = window.Capacitor?.isNativePlatform?.() ?? false;

    if (isNative) {
      // On device → use Capacitor Camera
      try {
        await Haptics.impact({ style: ImpactStyle.Light });
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.Base64, // Use base64 for API upload
          source: CameraSource.Prompt,
          promptLabelHeader: "Ajouter une photo",
          promptLabelPhoto: "Depuis la galerie",
          promptLabelPicture: "Prendre une photo",
        });
        return `data:image/jpeg;base64,${image.base64String}`;
      } catch {
        return null;
      }
    } else {
      // On web → trigger a file input
      return new Promise((resolve) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = (e) => {
          const file = e.target.files[0];
          if (!file) return resolve(null);
          const reader = new FileReader();
          reader.onload = (ev) => resolve(ev.target.result);
          reader.readAsDataURL(file);
        };
        input.click();
      });
    }
  },

  async getCurrentLocation() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      return coordinates;
    } catch (error) {
      return null;
    }
  },

  async vibrate() {
    await Haptics.impact({ style: ImpactStyle.Medium });
  },
};
