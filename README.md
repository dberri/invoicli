# InvoiCLI

A Node.js CLI to create invoices right from your terminal

## Example usage:

Fill the `template.config.js` with data that is usually repeated and execute the following:
```
invoicli -d "Description of the invoiced item" -q 10 -r 20
```

Where:

d: Description
q: Hours
r: Rate

You can also use `invoicli -h` for additional help.