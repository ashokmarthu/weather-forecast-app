import { Alert, AlertDescription } from "@/components/ui/alert";
import { SOMETHING_WRONG } from "./utils/constants";

interface ISnackBarProps {
  errMsg: string | null;
}
export function Snackbar({ errMsg }: ISnackBarProps) {
  return (
    <Alert variant="destructive">
      <AlertDescription>{errMsg || SOMETHING_WRONG}</AlertDescription>
    </Alert>
  );
}
