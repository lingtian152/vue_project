#!/bin/bash

echo "Do you want to install the modules? (Y/N)"
read -r INPUT

if [ "$INPUT" = "y" ] || [ "$INPUT" = "Y" ]; then
  install
elif [ "$INPUT" = "n" ] || [ "$INPUT" = "N" ]; then
  exit
fi

install() {
  npm install
  echo "Installation completed successfully."
  read -p "Press Enter to exit."
}
