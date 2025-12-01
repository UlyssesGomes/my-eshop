#!/bin/bash

# ===== CONFIGURAÇÕES =====
USER="root"                     # usuário SSH
HOST="seu-ip-ou-dominio"        # IP ou domínio da VPS
REMOTE_DIR="/var/www/html"      # diretório onde o Nginx serve o site
DIST_DIR="dist/browser"         # caminho gerado pelo Angular v18+
TEMP_DIR="/root/temp"
SAVED_DIR="/root/projects/suaestampa/front"

echo "🔧 Building angular application..."
ng build --configuration production

echo "📤 Sending files to vps..."
scp -r ${DIST_DIR} ${USER}@${HOST}:${TEMP_DIR}

echo "📂 Updating files on vps..."
ssh ${USER}@${HOST} << EOF
  sudo rm -rf ${SAVED_DIR}/*
  sudo mv ${TEMP_DIR} ${SAVED_DIR}
  sudo rm -rf ${TEMP_DIR}/*
  sudo cp ${SAVED_DIR} ${REMOTE_DIR}

  echo "🔄 Restarting NGINX..."
  sudo systemctl restart nginx
EOF

echo "✅ Deploy finish with success!"