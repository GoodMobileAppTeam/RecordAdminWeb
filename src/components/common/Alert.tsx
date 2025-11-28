interface AlertProps {
  type?: "success" | "error";
  message: string;
}

const base = "mb-4 rounded-md border px-3 py-2 text-sm";

const styles = {
  success: `${base} border-green-500 bg-green-50 text-green-800`,
  error: `${base} border-red-300 bg-red-50 text-red-800`,
};

export default function Alert({ type = "success", message }: AlertProps) {
  return <div className={styles[type]}>{message}</div>;
}
