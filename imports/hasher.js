import bigInt from 'big-integer';

const hasher = () => {
    const ALLOWED_CHARS  = 'acdegilmnoprstuw';
    const DEFAULT_LENGTH = 7;
    const MULTIPLIER     = 37;

    return {
        encode(str) {
            let i;
            let h = bigInt(DEFAULT_LENGTH);

            for (i = 0; i < str.length; i++) {
                h = h.multiply(MULTIPLIER).add(ALLOWED_CHARS.indexOf(str[i]));
            }

            return h;
        },
        decode(hash, len) {
            let str = '';
            let mod;
            let _hash = bigInt(hash);

            while (len > 0) {
                mod  = _hash.mod(MULTIPLIER);
                _hash = _hash.subtract(mod).divide(MULTIPLIER);

                if (+mod < 0 || +mod >= ALLOWED_CHARS.length) {
                    return "invalid hash!";
                }

                str = ALLOWED_CHARS[mod] + str;
                len--;
            }

            if (+_hash !== DEFAULT_LENGTH) {
              return "invalid hash!";
            }

            return str;
        }
    };
};

export default hasher;
