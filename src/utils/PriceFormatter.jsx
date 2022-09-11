export const PriceFormatter = (text) => {
    const numberWithCommas = new Intl.NumberFormat("en-GB");

    return numberWithCommas.format(text)
  }
  