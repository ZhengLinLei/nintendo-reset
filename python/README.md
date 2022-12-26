# Python Nintendo Master Key Generator

## Installation

### From PyPI (Recommended, but not yet available)
```bash
pip install nintendo-reset
```

### From Source
```bash
git clone https://github.com/ZhengLinLei/nintendo-reset.git

cd nintendo-reset/python
```

## Usage

```python

from nintendo_reset import MasterKey

# Generate the master key for the Nintendo DS
str = MasterKey("54033620", "12", "26")
# Print the master key
print(str.getMasterKey())
# Output: 11253
```


## Contributing

To contribute the project, please read the [../CONTRIBUTING.md](../CONTRIBUTING.md) file.



## License

MIT License