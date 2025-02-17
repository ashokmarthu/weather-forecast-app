import { Alert, AlertDescription } from "@/components/ui/alert";

interface ISnackBarProps {
  errMsg: string | null;
}
export function Snackbar({ errMsg }: ISnackBarProps) {
  return (
    <Alert variant="destructive">
      <AlertDescription>{errMsg || "Something wrong.."}</AlertDescription>
    </Alert>
  );
}
