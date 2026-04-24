import { useDropzone } from "react-dropzone";
import { UploadCloud, X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/services/pdfService";
import { cn } from "@/lib/utils";

interface Props {
  files: File[];
  onChange: (files: File[]) => void;
  multiple?: boolean;
  accept?: Record<string, string[]>;
  hint?: string;
}

export function UploadZone({
  files,
  onChange,
  multiple = true,
  accept = { "application/pdf": [".pdf"] },
  hint = "PDF files only",
}: Props) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    multiple,
    onDrop: (accepted) => {
      const next = multiple ? [...files, ...accepted] : accepted.slice(0, 1);
      onChange(next);
    },
  });

  const remove = (idx: number) => onChange(files.filter((_, i) => i !== idx));

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "group relative cursor-pointer rounded-2xl border-2 border-dashed border-border bg-card p-10 text-center transition-all duration-300",
          "hover:border-primary hover:bg-accent/40 hover:shadow-[var(--shadow-soft)]",
          isDragActive && "scale-[1.01] border-primary bg-accent/60"
        )}
      >
        <input {...getInputProps()} />
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-elegant)] transition-transform duration-300 group-hover:scale-110">
          <UploadCloud className="h-7 w-7" />
        </div>
        <p className="text-base font-semibold text-foreground">
          {isDragActive ? "Drop files here" : "Drag & drop or click to upload"}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">{hint}</p>
      </div>

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((file, idx) => (
            <li
              key={`${file.name}-${idx}`}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-[var(--shadow-soft)]"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                <FileText className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
                <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                aria-label={`Remove ${file.name}`}
                onClick={() => remove(idx)}
              >
                <X className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
