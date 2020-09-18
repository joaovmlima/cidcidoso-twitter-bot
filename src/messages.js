const MESSAGES = [
  'o cid é lindo',
  'cid você está radiante hoje',
  'cid o xet te ama',
  'ATENÇÃO\nO Seu Cid é confiável e nunca deu calote!!!!1!',
  'quem chama o Cid de caloteiro tem o pipiu pequeno',
  'Cid é confiável e cheiroso',
  'Oi Cid se você não é caloteiro me paga um café',
  'Hoje rola sorteio daquele monza?',
  'Cid seu cabelo tá chavoso hoje',
  'Cid como faz pra ter uma barba de macho igual a sua?',
  'Cid NUNCA deu calote',
  'B? H? G?',
  'Brabo\nHumilde\God',
  'Cid pai de todos nós',
  'Cid é fundador da internet brasileira'

]

module.exports = () => MESSAGES[Math.floor(Math.random() * MESSAGES.length)]
