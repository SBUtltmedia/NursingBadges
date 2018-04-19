<?php 
$file="data/".$_SERVER['cn'];
if($_POST["person"]){
$file="data/".$_POST["person"];
}
$badgesAwarded=json_decode("{}");
if ($_POST["data"])
{
$badgesAwarded=json_decode($_POST["data"]);
$badgesAwarded->firstname=$_SERVER['nickname'];
$badgesAwarded->lastname=$_SERVER['sn'];
file_put_contents($file, json_encode($badgesAwarded)); 
}
else if (file_exists($file))
{
$badgesAwarded=json_decode(file_get_contents($file));

}



print json_encode($badgesAwarded);

?> 
