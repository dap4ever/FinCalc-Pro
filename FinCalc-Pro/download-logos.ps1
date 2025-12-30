$downloads = @(
    @{url="https://www.itau.com.br/media/dam/m/63f08872cad58138/original/logo-branco-personnalite.png"; destino="itau.png"},
    @{url="https://pbs.twimg.com/profile_images/1737158472225927168/zyASghk-.jpg"; destino="bradesco.png"},
    @{url="https://yt3.googleusercontent.com/YoY6PQUzk6UXJEW8sTYs8zf_TfPLHNLSim65mswp_w5CX0jYgtl_le41QPRwoI1Hyj4OM2q_=s900-c-k-c0x00ffffff-no-rj"; destino="bb.png"}
)

$pastaDestino = "public\images\bancos"

Write-Host "Baixando logos dos bancos..." -ForegroundColor Green

foreach ($download in $downloads) {
    $caminhoCompleto = Join-Path $pastaDestino $download.destino
    try {
        Write-Host "Baixando $($download.destino)..." -ForegroundColor Cyan
        Invoke-WebRequest -Uri $download.url -OutFile $caminhoCompleto -UseBasicParsing
        Write-Host "  ✓ $($download.destino) baixado com sucesso!" -ForegroundColor Green
    } catch {
        Write-Host "  ✗ Erro ao baixar $($download.destino): $_" -ForegroundColor Red
    }
}

Write-Host "`nDownload concluido! Verifique a pasta $pastaDestino" -ForegroundColor Green
Write-Host "Nota: Voce ainda precisa baixar manualmente os logos da Caixa e Santander." -ForegroundColor Yellow
