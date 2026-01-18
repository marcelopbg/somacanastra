import { SetStateAction, Fragment, useState } from "react";
import toast from "react-hot-toast";
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, Dialog, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { primaryButtonClass, secondaryButtonClass } from "../lib/styleElements";
import { PlayerScore, SavedScore } from "./CanastraCalculator";
import { useScoreContext } from "./ScoreContext";

interface SaveDialogProps {
    isSaveOpen: boolean;
    setIsSaveOpen: React.Dispatch<SetStateAction<boolean>>;
    total: number;
    playerBateu: boolean;
    playerNaoPegouMorto: boolean;
    score: PlayerScore;
    resetState: () => void;
}

export type OwnerOption = { label: string; value: string }

export const SaveDialog = ({ isSaveOpen, setIsSaveOpen, total, playerBateu, playerNaoPegouMorto, score, resetState }: SaveDialogProps) => {

    const [ownerOption, setOwnerOption] = useState<OwnerOption | null>(null);
    const [inputVal, setInputVal] = useState('');
    const { handleSave, scoreList } = useScoreContext();

    const owners = Array.from(scoreList.map(s => s.ownerName).reduce((prev, curr) => {
        prev.add(curr);
        return prev;
    }, new Set<string>()));

    const ownerOptions = owners.map(o => ({ label: o, value: o }));

    const onSave = (owner: string) => {
        if (!owner.trim()) return;

        const createdAt = new Date().toISOString();
        const item: SavedScore = {
            id: createdAt,
            ownerName: owner.trim(),
            total,
            playerBateu,
            playerNaoPegouMorto,
            score: structuredClone(score),
            createdAt,
        };

        handleSave(item);
        toast.success("Pontuação salva!", {
            duration: 1500,
            position: "top-center",
            style: {
                background: "linear-gradient(135deg, #16a34a, #22c55e)",
                color: "#ffffff",
                fontWeight: 600,
                padding: "14px 22px",
                borderRadius: "14px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            },
            iconTheme: {
                primary: "#dcfce7",
                secondary: "#16a34a",
            },
        });

        resetState();
        setOwnerOption(null);
        setInputVal('');
    }

    const cancelEdit = () => {
        setIsSaveOpen(false);
        setOwnerOption(null);
        setInputVal('');
    }

    const filteredOptions = ownerOptions.filter(o =>
        o.label.toLowerCase().includes(inputVal.toLowerCase())
    );

    const exactMatch = ownerOptions.some(o => o.label.toLowerCase() === inputVal.toLowerCase());

    return (
        <Transition show={isSaveOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={setIsSaveOpen}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                </TransitionChild>

        <div className="fixed inset-0 flex items-center justify-center p-4">
    <TransitionChild
        as={Fragment}
        enter="ease-out duration-200"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-150"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
    >
        {/* Use max-h-[90vh] and overflow-auto to prevent keyboard overlap */}
        <div className="border shadow-md border-gray-200 dark:border-gray-700 w-full max-w-md bg-white dark:bg-[#242424] rounded-lg shadow-lg p-6
                        max-h-[90vh] overflow-auto">
            <div className="mb-4">
                <DialogTitle className="text-lg font-semibold">Salvar pontuação</DialogTitle>
            </div>

            <label className="text-sm opacity-80 mb-1 block">Time ou pessoa</label>
            <div className="relative">
                <Combobox
                    value={ownerOption}
                    onChange={(opt: OwnerOption | null) => {
                        setOwnerOption(opt);
                        setInputVal(opt?.value ?? '');
                    }}
                >
                    <div className="flex items-center gap-2">
                        <ComboboxInput
                            autoFocus
                            className="w-full border border-gray-300 dark:border-gray-700 rounded px-2 py-1 text-sm bg-transparent focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            displayValue={(o: OwnerOption | null) => o?.label ?? inputVal}
                            onChange={e => {
                                setInputVal(e.target.value);
                                setOwnerOption(null);
                            }}
                            placeholder="Digite ou selecione..."
                            value={inputVal}
                        />
                        <button
                            type="button"
                            className="text-sm text-gray-500 hover:text-gray-700"
                            onClick={() => { setOwnerOption(null); setInputVal('') }}
                            aria-label="Limpar"
                        >
                            ✕
                        </button>
                    </div>

                    {filteredOptions.length > 0 && (
                        <ComboboxOptions className="absolute mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow z-50 max-h-48 overflow-auto text-sm max-w-[335px]">
                            {inputVal.trim().length > 0 && !exactMatch && (
                                <ComboboxOption
                                    key="create"
                                    value={{ label: inputVal, value: inputVal }}
                                    className={({ active }) => `cursor-pointer px-2 py-1 ${active ? 'bg-indigo-100 dark:bg-indigo-900' : ''}`}
                                >
                                    {`Criar "${inputVal}"`}
                                </ComboboxOption>
                            )}

                            {filteredOptions.length > 0 ? (
                                filteredOptions.map(o => (
                                    <ComboboxOption
                                        key={o.value}
                                        value={o}
                                        className={({ active }) => `cursor-pointer px-2 py-1 ${active ? 'bg-indigo-100 dark:bg-indigo-900' : ''}`}
                                    >
                                        {o.label}
                                    </ComboboxOption>
                                ))
                            ) : (
                                <div className="px-2 py-1 text-gray-500">Nenhuma opção</div>
                            )}
                        </ComboboxOptions>
                    )}
                </Combobox>
            </div>

            <div className="mt-6 flex justify-end gap-2">
                <button className={secondaryButtonClass} onClick={cancelEdit}>Cancelar</button>
                <button
                    onMouseDown={e => e.preventDefault()}
                    className={primaryButtonClass}
                    onClick={() => {
                        const name = inputVal.trim() || ownerOption?.value.trim() || '';
                        if (!name) return;
                        onSave(name);
                        setIsSaveOpen(false);
                    }}
                >
                    Salvar
                </button>
            </div>
        </div>
    </TransitionChild>
</div>

            </Dialog>
        </Transition>
    );
}
