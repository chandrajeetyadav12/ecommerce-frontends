import {
  Button,
  Typography,
} from "@mui/material";

interface Props {
  label: string;
  onChange: (
    file: File | null
  ) => void;
}

export default function FileUpload({
  label,
  onChange,
}: Props) {
  return (
    <>
      <Typography>
        {label}
      </Typography>

      <input
        type="file"
        onChange={(e) =>
          onChange(
            e.target.files?.[0] || null
          )
        }
      />
    </>
  );
}