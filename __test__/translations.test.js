import { en as enTranslations } from "../src/i18n/json/en.json";
import { pt as ptTranslations } from "../src/i18n/json/pt.json";
import { es as esTranslations } from "../src/i18n/json/es.json";

function checkMissingKeys(sourceKeys, targetKeys, sourceLang, targetLang) {
  const missingKeys = sourceKeys.filter((key) => !targetKeys.includes(key));
  if (missingKeys.length > 0) {
    throw new Error(
      `As seguintes chaves estão presentes no arquivo de tradução em ${sourceLang}, mas estão faltando no arquivo de tradução em ${targetLang}: ` +
        missingKeys.join(", ")
    );
  }
}

test("verifica se todas as chaves de tradução existem em todos os arquivos JSON", () => {
  const enKeys = Object.keys(enTranslations);
  const ptKeys = Object.keys(ptTranslations);
  const esKeys = Object.keys(esTranslations);

  checkMissingKeys(enKeys, ptKeys, "inglês", "português");
  checkMissingKeys(enKeys, esKeys, "inglês", "espanhol");
  checkMissingKeys(ptKeys, enKeys, "português", "inglês");
  checkMissingKeys(esKeys, enKeys, "espanhol", "inglês");
});
