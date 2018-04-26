<?php 
#print $_POST["person"]=="";
$badgesAwarded=json_decode("{}");
$person= $_POST["netid"] ?: $_SERVER['cn'];


$file="data/".$person;

if ($_POST["data"])
{
$badgesAwarded->badgesAwarded=json_decode($_POST["data"]);
$badgesAwarded->info->firstname=$_SERVER['nickname'];
$badgesAwarded->info->lastname=$_SERVER['sn'];
$badgesAwarded->info->netid=$_SERVER['cn'];
//$badgesAwarded->info->badgeCount=$_SERVER['count'];
file_put_contents($file, json_encode($badgesAwarded)); 
}
else{
$file="data/".$person;
$badgesAwarded=json_decode(file_get_contents($file));    
    
if($_SERVER['cn'] == $person){
    $badgesAwarded->info->canEdit=True;
    $badgesAwarded->info->netid=$_SERVER['cn']; 
}

}



#print_r($_SERVER['cn']."----".$_POST["person"]  )

print json_encode($badgesAwarded);

?>
