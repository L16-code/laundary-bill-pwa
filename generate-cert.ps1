# PowerShell script to generate self-signed certificates for local development

# Create directory if it doesn't exist
if (!(Test-Path -Path "cert")) {
    New-Item -ItemType Directory -Path "cert"
}

# Move to the cert directory
Set-Location -Path "cert"

# Generate private key
Write-Host "Generating private key..."
openssl genrsa -out key.pem 2048

# Generate self-signed certificate
Write-Host "Generating self-signed certificate..."
openssl req -new -x509 -key key.pem -out cert.pem -days 365 -subj "/CN=localhost"

Write-Host "Certificates generated successfully!"
Write-Host "- Private key: cert/key.pem"
Write-Host "- Certificate: cert/cert.pem"
