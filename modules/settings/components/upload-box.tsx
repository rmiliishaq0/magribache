
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { visualSchema } from "../schamas/settings";
import z from "zod";
import { Input } from "@/components/ui/input";
import Image from "next/image";


type VisualValues = z.infer<typeof visualSchema>;

export default function UploadBox({
  name,
  label,
  hint,
  icon,
  control,
  logo
}: {
  name: "logo" | "watermark" | "signature";
  label: string;
  hint: string;
  icon: React.ReactNode;
  control: ReturnType<typeof useForm<VisualValues>>["control"];
  logo?:string;
}) {
  console.log(logo)
  return (
    <section className="min-w-0 w-full max-w-full overflow-hidden rounded-xl border border-slate-200 p-3">
      <h2 className="min-w-0 truncate text-[10px] font-bold text-slate-800">
        {label}
      </h2>

      <p className="mt-1 min-w-0 h-7 max-w-full text-[8px] leading-3 text-slate-500">
        {hint}
      </p>

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Field className="min-w-0 max-w-full">
            <FieldLabel
              htmlFor={name}
              className="mt-3 flex h-24 w-full min-w-0 max-w-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border border-dashed border-primary/40 bg-primary/5 text-primary"
            >
              {field.value instanceof File  ? 
                              <Image width={60} height={50} alt={`${label} preview`} src={URL.createObjectURL(field.value)}/> 
              
              : 
              (
                logo != undefined && logo != null  && logo != "undefined" ? <Image width={60} height={50} alt={`${label} preview`} src={"/" + logo}/> 
                :
                <>
                <span className="shrink-0">{icon}</span>

              <span className="max-w-full truncate text-[9px] font-semibold">
                Importer le fichier
              </span>

              <span className="max-w-full truncate text-[8px] font-normal text-slate-400">
                PNG transparent recommandé
              </span>
              </>
              )
              }
            </FieldLabel>

            <Input
              id={name}
              type="file"
              accept="image/png,image/jpeg"
              className="hidden"
              onChange={(event) =>
                field.onChange(event.target.files?.[0])
              }
            />

            {fieldState.error && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />
    </section>
  );
}