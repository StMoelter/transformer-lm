from lm.inference import ModelWrapper

class ModelApiConnector:
    def __init__(self, model_root):
        self.model = ModelWrapper.load(model_root)

    def responses_for_text(self, text, params):
        tokens = self.tokenizer(text)
        params = self.extract_params(params)
        predicitions = []

        for i in range(3):
            predicitions.append(self.generate_text(tokens, params))
        return {"predicitions": predicitions, "params": params}

    def generate_text(self, tokens, params):
        new_tokens = self.model.generate_tokens(
            tokens,
            tokens_to_generate=params['tokens_to_generate'],
            top_k=params['top_k'],
            top_p=params['top_p'],
            temperature=params['temperature'],
        )
        return self.model.sp_model.decode_pieces(new_tokens)

    def tokenizer(self, text):
        tokens = [self.model.END_OF_TEXT] + self.model.tokenize(text)
        tokens = tokens[:self.model.model.hparams.n_ctx]
        return tokens

    def extract_params(self, params):
        return {
            "tokens_to_generate": self.normalize_i(params, 'tokens_to_generate', 5, 40, 20),
            "top_k": self.normalize_i(params, 'top_k', 0, 20, 5),
            "top_p": self.normalize_i(params, 'top_p', 0, 20, 0),
            "temperature": self.normalize_f(params, 'temperature', 0.0, 2.0, 1.0),
        }

    def normalize_i(self, params, name, min, max, default):
        return int(self.normalize_f(params, name, min, max, default))

    def normalize_f(self, params, name, min, max, default):
        if not(name in params):
            return default
        try:
            value = float(params[name])
            if value < min:
                return min
            if value > max:
                return max
            return value
        except ValueError:
            return default
