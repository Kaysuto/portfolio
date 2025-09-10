# Script de nettoyage des fichiers vides générés automatiquement
# Utilisation: .\clean-empty-files.ps1

$emptyFiles = @(
    "create-ip-whitelist.sql",
    "debug-auth-detailed.sql", 
    "update-maintenance-defaults.js",
    "database\create_portfolio_links_table.sql",
    "src\admin\components\VirtualizedList.tsx",
    "src\admin\pages\SecurityPage.tsx",
    "src\admin\pages\Maintenance.tsx",
    "src\admin\pages\Settings.tsx",
    "src\components\HeroSection_clean.tsx", 
    "src\hooks\useAuth.ts",
    "src\scripts\testSupabaseConnection.ts"
)

Write-Host "🧹 Nettoyage des fichiers vides..." -ForegroundColor Yellow

$cleaned = 0
foreach ($file in $emptyFiles) {
    if (Test-Path $file) {
        $fileInfo = Get-Item $file
        if ($fileInfo.Length -eq 0) {
            Remove-Item $file -Force
            Write-Host "✅ Supprimé: $file" -ForegroundColor Green
            $cleaned++
        } else {
            Write-Host "⚠️  Ignoré (non vide): $file" -ForegroundColor Yellow
        }
    }
}

if ($cleaned -eq 0) {
    Write-Host "✨ Aucun fichier vide à nettoyer!" -ForegroundColor Green
} else {
    Write-Host "🎉 $cleaned fichiers vides supprimés!" -ForegroundColor Green
}
