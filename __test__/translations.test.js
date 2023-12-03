import { translation as enTranslations } from "../src/i18n/json/en-US.json";
import { translation as ptTranslations } from "../src/i18n/json/pt-BR.json";

test("verifica se todas as chaves de tradução existem em ambos os arquivos JSON", () => {
  const enKeys = Object.keys(enTranslations);
  const ptKeys = Object.keys(ptTranslations);

  const missingKeys = enKeys.filter((key) => !ptKeys.includes(key));

  if (missingKeys.length > 0) {
    throw new Error(
      "As seguintes chaves estão faltando no arquivo de tradução em português: " +
        missingKeys.join(", ")
    );
  }
});
