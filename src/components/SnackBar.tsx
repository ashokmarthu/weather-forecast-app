import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ISnackBarProps {
  errMsg: string;
}
export function Snackbar({
  errMsg = "Your session has expired. Please log in again",
}: ISnackBarProps) {
  return (
    <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{errMsg}</AlertDescription>
    </Alert>
  );
}
