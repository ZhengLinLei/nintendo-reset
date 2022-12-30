# Typescript Nintendo Master Key Generator

## Installation

### From NPM (Recommended, but not yet available)
```bash
npm install nintendo-reset
```

### From Source
```bash
git clone https://github.com/ZhengLinLei/nintendo-reset.git

cd nintendo-reset/typescript
```

## Usage

```ts
import {MasterKey} from "nintendo-reset"
let str : MasterKey = new MasterKey("54033620", "12", "26")
console.log(str.getMasterKey)
//Output: 11253
```


## Contributing

To contribute the project, please read the [../CONTRIBUTING.md](../CONTRIBUTING.md) file.



## License

MIT License