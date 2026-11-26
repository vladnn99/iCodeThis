$ErrorActionPreference = 'Stop'
Import-Module ExchangeOnlineManagement

$applicationId = '1d4d64b0-dfa6-4aa9-a457-4b23a17099f3'
$principalId = 'a44c4fe9-cdb4-4f34-bdee-2b6fa0d81231'
$scopeName = 'NEC Contact Office Only'
$assignmentName = 'NEC Contact Send Office'
$mailboxAddress = 'office@negreanaccounting.com'

Connect-ExchangeOnline -ErrorAction Stop

# An existing tenant-wide Mail.Send grant in Entra is not limited by this scope.
Write-Host 'Aceasta configureaza Application RBAC. Nu adauga separat Mail.Send in API permissions din Entra.'
$principal = Get-ServicePrincipal | Where-Object { $_.AppId -eq $applicationId }
if (-not $principal) {
    New-ServicePrincipal -AppId $applicationId -ObjectId $principalId -DisplayName 'NEC Contact Local' -ErrorAction Stop
} elseif ($principal.ObjectId -ne $principalId) {
    throw 'Service principal existent cu alt Object ID. Verifica Enterprise applications.'
}

# Explicitly verify creation even if a remote cmdlet reports a non-terminating error.
$verifiedPrincipal = @(Get-ServicePrincipal -ErrorAction Stop | Where-Object { $_.AppId -eq $applicationId -and $_.ObjectId -eq $principalId })
if ($verifiedPrincipal.Count -ne 1) {
    throw 'Aplicatia nu a fost gasita in Exchange. Verifica Object ID din Enterprise applications si tenant-ul conectat. Configurarea a fost oprita.'
}

$scope = Get-ManagementScope | Where-Object Name -eq $scopeName
if (-not $scope) {
    New-ManagementScope -Name $scopeName -RecipientRestrictionFilter "PrimarySmtpAddress -eq '$mailboxAddress'"
}

# Verify that the named scope includes only the intended mailbox before granting access.
$scope = Get-ManagementScope -Identity $scopeName
$members = @(Get-Recipient -RecipientPreviewFilter $scope.RecipientFilter)
if ($members.Count -ne 1 -or [string]$members[0].PrimarySmtpAddress -ne $mailboxAddress) {
    throw 'Scope-ul nu contine exclusiv casuta office. Nu acord permisiunea.'
}

$existingAssignment = Get-ManagementRoleAssignment -Identity $assignmentName -ErrorAction SilentlyContinue
if (-not $existingAssignment) {
    New-ManagementRoleAssignment -Name $assignmentName -Role 'Application Mail.Send' -App $principalId -CustomResourceScope $scopeName -ErrorAction Stop
}

Write-Host 'Rezultatul pentru office trebuie sa includa Application Mail.Send cu InScope=True:'
Test-ServicePrincipalAuthorization -Identity $principalId -Resource $mailboxAddress | Format-Table RoleName, GrantedPermissions, AllowedResourceScope, ScopeType, InScope -AutoSize
Write-Host 'Rezultatul pentru vlad trebuie sa fie InScope=False pentru acest rol:'
Test-ServicePrincipalAuthorization -Identity $principalId -Resource 'vlad@negreanaccounting.com' | Format-Table RoleName, GrantedPermissions, AllowedResourceScope, ScopeType, InScope -AutoSize
Write-Host 'Comenzile au fost executate; verifica rezultatele InScope de mai sus. Pastreaza CONTACT_MODE=demo pana verificam rezultatele. Autorizarea poate necesita timp pentru propagare.'
