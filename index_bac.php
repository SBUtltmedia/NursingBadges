<? 
if(!array_key_exists("cn",$_SERVER))
{
header("Location: https://apps.tlt.stonybrook.edu/Shibboleth.sso/Login?isPassive=On&target=http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]index.html"); 
}
else{
header("Location: http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]index.html"); 

}

?>
