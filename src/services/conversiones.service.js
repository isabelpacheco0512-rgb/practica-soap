export const conversionesService = {
  ConversionesService: {
    ConversionesPort: {
      CelsiusAFahrenheit(args) {
        const celsius = Number(args.celsius);
        return { fahrenheit: celsius * 9 / 5 + 32 };
      },

      KilometrosAMillas(args) {
        const kilometros = Number(args.kilometros);
        return { millas: kilometros * 0.621371 };
      },
    },
  },
};