/* dotend-safe set-up */
import dotenv_safe from "dotenv-safe";
dotenv_safe.config({ allowEmptyValues: true });

/* app running configuration */
process.env.BASE_PATH = process.cwd();
import(process.env.BASE_PATH + "/src/app/app.ts");
