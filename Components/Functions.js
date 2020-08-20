
export const validateInput = ({ address, setAddress, binArray, setBinArray, item, text }) => {

  console.log(`\nvalidateInput \item: ${JSON.stringify(item)} \ntext: ${JSON.stringify(text)}`);

  var newText = text;
  var newItem = item;
  let id = newItem.id;
  let num = ~~newText;
  let len = 0;
  if (newItem.type.localeCompare('octet') === 0) {
    len = 3;
    if (num < 0 || num > 255) {
      newText = '000';
      errMsg = "Error: number must be between 0 and 255 inclusive."
    }
  }
  else if (newItem.type.localeCompare('cidr') === 0) {
    if (num < 0 || num > 31) {
      len = 2;
      newText = '00';
      errMsg = "Error: CIDR mask must be between 0 and 31 inclusive."
    }
  }
  while (newText.length < len) newText = "0" + newText;
  newItem.value = newText;

  console.log(`\nnewText = ${newText} newText.length = ${newText.length} newItem.value = ${newItem.value}`);

  updateAddress({ address: address, setAddress: setAddress, item: newItem });

  updateBinaryAddress({ binArray: binArray, setBinArray: setBinArray, id: id, newText: newText });
  return (newText);
};

export const updateBinaryAddress = ({ binArray, setBinArray, id, newText }) => {
  let dec = ~~newText;
  let newBin = dec.toString(2);

  console.log(`updateBinaryAddress newBin = ${newBin}`);

  if (id < 4) {
    while (newBin.length < 8) {
      newBin = '0' + newBin;
    }
  } else {
    newBin = '';
    while (newBin.length < dec) {
      newBin = '1' + newBin;
    }
    while (newBin.length < 32) {
      newBin += '0';
    }
    let octet1 = newBin.slice(0,8) + '.';
    let octet2 = newBin.slice(8,16) + '.';
    let octet3 = newBin.slice(16,24) + '.';
    let octet4 = newBin.slice(24);
    newBin = octet1+octet2+octet3+octet4;
  }
  var newBinArray = binArray;
  changed = 0;
  newBinArray = newBinArray.map((obj) => {
    if (obj.id === id) {
      if (obj.value.localeCompare(newBin) === 0) {
        return obj;
      }
      else {
        if (obj.value.localeCompare(newBin) !== 0) {
          changed++;
          obj = { ...obj, value: newBin };
          return obj;
        }
      }
    }
    else return obj;
  });
  setBinArray(newBinArray);
};

export const updateAddress = ({ address, setAddress, item }) => {

  console.log(`\nupdateAddress item.id: ${item.id} item.value: ${item.value}`);

  let newAddress = address;
  changed = 0;
  newAddress = newAddress.map((obj) => {
    if (obj.id === item.id) {
      if (obj.value.localeCompare(item.value) === 0) {
        return obj;
      }
      else {
        if (obj.value.localeCompare(item.value) !== 0) {
          changed++;
          obj = { ...obj, value: item.value };
          return obj;
        }
      }
    }
    else return obj;
  });
  setAddress(newAddress);
};