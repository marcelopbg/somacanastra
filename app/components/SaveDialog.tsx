import { SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { StylesConfig, Theme } from "react-select";
import CreatableSelect from "react-select/creatable";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";
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


    const selectStyles: StylesConfig<OwnerOption, false> = {
        control: (base) => ({
            ...base,
            backgroundColor: 'transparent',
            borderColor: 'currentColor',
            boxShadow: 'none',
            minHeight: '32px',
            height: '32px',
            '&:hover': { borderColor: '#646cff' },
        }),
        valueContainer: (base) => ({ ...base, padding: '0 8px' }),
        input: (base) => ({
            ...base,
            color: 'inherit',
        }),
        singleValue: (base) => ({
            ...base,
            color: 'inherit',
        }),
        placeholder: (base) => ({
            ...base,
            color: 'inherit',
            opacity: 0.6,
        }),
        menu: (base) => ({
            ...base,
            // match the dialog content background so menu is solid and readable
            backgroundColor: 'inherit',
            border: 'none',
            borderRadius: 8,
            boxShadow: '0 10px 30px rgba(2,6,23,0.45)',
            padding: 6,
            zIndex: 60,
        }),
        menuList: (base) => ({ ...base, padding: 4, borderRadius: 6 }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? 'rgba(100,92,255,0.12)' : 'transparent',
            color: 'inherit',
            borderRadius: 6,
            padding: '6px 8px',
        }),
        dropdownIndicator: (base) => ({ ...base, padding: 4 }),
        clearIndicator: (base) => ({ ...base, padding: 4 }),
        indicatorsContainer: (base) => ({ ...base, paddingRight: 4 }),
    }

    const [ownerOption, setOwnerOption] = useState<OwnerOption | null>(null);
    const [inputVal, setInputVal] = useState('');
    const { handleSave, scoreList } = useScoreContext();
    const owners = Array.from(scoreList.map(s => s.ownerName).reduce((prev, curr) => {
        prev.add(curr);
        return prev;
    }, new Set<string>));

    const ownerOptions = owners.map(o => ({ label: o, value: o }))

    const onSave = (owner: string) => {
        if (!owner || owner.trim() === '') return
        const createdAt = new Date().toISOString()
        const item: SavedScore = {
            id: createdAt,
            ownerName: owner.trim(),
            total,
            playerBateu,
            playerNaoPegouMorto,
            score: structuredClone(score),
            createdAt,
        }

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


        // Auto-clean calculator state after successful save
        resetState()
        setOwnerOption(null)
    }

    const cancelEdit = () => {
        setIsSaveOpen(false);
        setOwnerOption(null);

    }

    return <Dialog open={isSaveOpen} onOpenChange={setIsSaveOpen} >
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Salvar pontuação</DialogTitle>
            </DialogHeader>

            <div className="h-50">
                <label className="text-sm opacity-80 mb-1 block">Time ou pessoa</label>
                <CreatableSelect
                    inputValue={inputVal}
                    onInputChange={(e) => { setInputVal(e) }}
                    classNamePrefix="owner"
                    placeholder="Digite ou selecione..."
                    formatCreateLabel={(v) => `Criar "${v}"`}
                    value={ownerOption}
                    onChange={(opt) => setOwnerOption(opt as OwnerOption | null)}
                    options={ownerOptions}
                    isClearable
                    styles={selectStyles}
                    theme={(theme: Theme) => ({
                        ...theme,
                        colors: {
                            ...theme.colors,
                            primary: '#646cff',
                            neutral0: 'transparent',
                            neutral80: 'inherit',
                        },
                    })}
                />
            </div>
            <DialogFooter>
                <button className={secondaryButtonClass} onClick={cancelEdit}>Cancelar</button>
                <button
                    className={primaryButtonClass}
                    onClick={() => {
                        const name = ownerOption?.value?.trim() || inputVal || ''
                        if (!name) return
                        onSave(name)
                        setIsSaveOpen(false)
                    }}
                >
                    Salvar
                </button>

            </DialogFooter>
        </DialogContent>
    </Dialog>
}