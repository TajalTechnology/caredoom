/* dotend-safe set-up */
import dotenv_safe from "dotenv-safe";
dotenv_safe.config({ allowEmptyValues: false });

/* app running configuration */
require("./src/app/app");
