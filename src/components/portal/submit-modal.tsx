"use client";

import { FormEvent, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { usePortalStore } from "@/store/portal-store";
import { repositorySubmissionSchema } from "@/lib/validation";
import type { RepositorySubmissionInput } from "@/lib/validation";

const initialForm: RepositorySubmissionInput = {
  title: "",
  repositoryUrl: "",
  summary: "",
  stack: "",
  owner: "",
};

export function SubmitRepositoryModal() {
  const isOpen = usePortalStore((state) => state.isSubmitModalOpen);
  const close = usePortalStore((state) => state.closeSubmitModal);
  const [form, setForm] = useState<RepositorySubmissionInput>(initialForm);
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const isDisabled = useMemo(
    () => Object.values(form).some((value) => value.trim().length === 0),
    [form],
  );

  if (!isOpen) {
    return null;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = repositorySubmissionSchema.safeParse(form);

    if (!parsed.success) {
      setStatus("idle");
      setErrors(parsed.error.issues.map((issue) => issue.message));
      toast.error("Revise os campos obrigatórios.");
      return;
    }

    const response = await fetch("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });

    if (!response.ok) {
      setStatus("idle");
      setErrors(["Não foi possível submeter no momento."]);
      toast.error("Falha ao enviar submissão.");
      return;
    }

    setStatus("success");
    setErrors([]);
    setForm(initialForm);
    toast.success("Submissão recebida com sucesso.");
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Submit Repository"
    >
      <div className="glass-panel rounded-xl w-full max-w-xl p-6 border border-cyan-500/20">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-xl font-semibold">Submit Repository</h2>
          <button
            type="button"
            onClick={close}
            className="text-slate-300"
            aria-label="Fechar formulário de submissão"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            className="w-full rounded-lg bg-slate-900/70 border border-slate-700 p-2"
            placeholder="Título do projeto"
            value={form.title}
            onChange={(event) => setForm({ ...form, title: event.target.value })}
          />
          <input
            className="w-full rounded-lg bg-slate-900/70 border border-slate-700 p-2"
            placeholder="URL do repositório"
            value={form.repositoryUrl}
            onChange={(event) =>
              setForm({ ...form, repositoryUrl: event.target.value })
            }
          />
          <textarea
            className="w-full rounded-lg bg-slate-900/70 border border-slate-700 p-2"
            placeholder="Resumo"
            rows={3}
            value={form.summary}
            onChange={(event) =>
              setForm({ ...form, summary: event.target.value })
            }
          />
          <input
            className="w-full rounded-lg bg-slate-900/70 border border-slate-700 p-2"
            placeholder="Stack tecnológica"
            value={form.stack}
            onChange={(event) => setForm({ ...form, stack: event.target.value })}
          />
          <input
            className="w-full rounded-lg bg-slate-900/70 border border-slate-700 p-2"
            placeholder="Responsável"
            value={form.owner}
            onChange={(event) => setForm({ ...form, owner: event.target.value })}
          />

          {errors.length > 0 ? (
            <ul className="text-sm text-rose-300 space-y-1">
              {errors.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          ) : null}
          {status === "success" ? (
            <p className="text-sm text-emerald-300">
              Submissão validada e recebida com sucesso.
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isDisabled}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-slate-950 font-semibold py-2 rounded-lg disabled:opacity-60"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
