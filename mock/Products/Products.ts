export type Measures = "g" | "mg" | "kcal";

export interface IProduct {
    label: string;
    value: string;
    ext: Measures;
}

export const initialProducts: IProduct[] = [
    { label: "Quantidade da Porção (g)", value: "quantidadeDaPorcao", ext: "g" },
    { label: "Valor Energético (kcal)", value: "valorEnergetico", ext: "kcal" },
    { label: "Carboidratos (g)", value: "carboidratos", ext: "g" },
    { label: "Proteínas (g)", value: "proteinas", ext: "g" },
    { label: "Gorduras Totais (g)", value: "gordurasTotais", ext: "g" },
    { label: "Gorduras Saturadas (g)", value: "gordurasSaturadas", ext: "g" },
    { label: "Gorduras Trans (g)", value: "gordurasTrans", ext: "g" },
    { label: "Fibra Alimentar (g)", value: "fibraAlimentar", ext: "g" },
    { label: "Sódio (mg)", value: "sodio", ext: "mg" },
];
