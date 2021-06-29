# RandomApp
React app de generadores de números pseudoaleatorios y pruebas de uniformidad para el global integrador de la cátedra de Simulación - Ingeniería en Sistemas de Información - UTN FRM
# Integrantes
- Facundo Erbin
# Para iniciar el proyecto
- Instalar Node.Js en caso de no tenerlo instalado (https://nodejs.org/en/ versión 14 LTS)
- Desde la carpeta raíz del proyecto, ejecutar el comando desde la terminal 
    npm install
- Luego de que se hayan instalado las dependencias correspondientes ejecutar el comando
    npm run start
- El servidor debería arrancar en el puerto 3000. Acceder desde el navegador localhost:3000
- ¡Listo!
# Tecnologías
Este proyecto fue realizado utilizando React y Typescript. Además se utilizó Bulma CSS como framework CSS.
# Pruebas Implementadas
- Chi cuadrada: Permite ingresar valores de números aleatorios normalizados, un alpha y la cantidad de intervalos.
- Kolmogorov-Smirnov: Permite ingresar los valores de números aleatorios normalizados y seleccionar un alpha.
- Serial: Recibe la matriz de intervalor y un alpha.
# Generadores Implementados
- Generador Congruencial: Permite ingresar una semilla y valores para los números a,b y m correspondientes al generador congruencial Xn+1=(a*Xn+b) mod m. Con b igual a 0 sería un Generador Congruencial Multiplicativo y con b <> 0 es un Generador Congruencial Lineal.
- Generador de Cuadrado Medio: Permite ingresar una semilla, la longitud de los números aleatorios que se desea obtener y la cantidad de números a calcular.