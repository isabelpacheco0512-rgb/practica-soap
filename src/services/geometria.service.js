export const geometriaService = {
  GeometriaService: {
    GeometriaPort: {
      AreaRectangulo(args) {
        const base = Number(args.base);
        const altura = Number(args.altura);
        return { area: base * altura };
      },

      PerimetroRectangulo(args) {
        const base = Number(args.base);
        const altura = Number(args.altura);
        return { perimetro: 2 * (base + altura) };
      },
    },
  },
};