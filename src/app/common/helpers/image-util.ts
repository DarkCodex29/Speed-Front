export class ImageUtil {
  public static extraerBase64 = async ($event: Blob) =>
    new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          console.error(error);
          resolve({
            base: null,
          });
        };
      } catch (e) {
        reject({
          base: null,
        });
      }
    });
}
