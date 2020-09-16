from lm.inference import ModelWrapper

class ModelApiConnector:
  def __init__(self, model_root):
    self.model = ModelWrapper.load(model_root)

  def responses_for_text(self, text):
      tokens = self.tokenizer(text)
      predicitions = []

      for i in range(3):
        predicitions.append(self.generate_text(tokens))
      return predicitions

  def generate_text(self, tokens, tokens_to_generate=20, top_k=10, top_p=0.0, temp=1.0 ):
    new_tokens = self.model.generate_tokens(
      tokens,
      tokens_to_generate=tokens_to_generate,
      top_k=top_k,
      top_p=top_p,
      temperature=temp,
    )
    return self.model.sp_model.decode_pieces(new_tokens)

  def tokenizer(self, text):
      tokens = [self.model.END_OF_TEXT] + self.model.tokenize(text)
      tokens = tokens[:self.model.model.hparams.n_ctx]
      return tokens
