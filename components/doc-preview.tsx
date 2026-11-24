"use client";

import DevisPreview from "@/modules/devis/components/doc-preview";

export default function DocPreview(props: {
  form: any;
  name: string;
  email: string;
  phone: string;
  isFacture: boolean;
  docNumber?: string | null;
  clientRefrence?: string;
}) {
  return (
    <DevisPreview
      {...props}
      docNumber={props.docNumber ?? null}
      clientRefrence={props.clientRefrence ?? "CL"}
    />
  );
}
