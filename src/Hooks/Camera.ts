import { useState, useEffect } from "react";
import * as Permissions from "expo-permissions";

export function useCameraPermission() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasPermission(status === "granted");
    })();
  }, []);

  return hasPermission;
}
