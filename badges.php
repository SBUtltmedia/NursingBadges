<?php 
#print $_POST["person"]=="";
$badgesAwarded=json_decode("{}");
$person= $_POST["person"] ?: $_SERVER['cn'];


$file="data/".$person;

if ($_POST["data"])
{
$badgesAwarded=json_decode($_POST["data"]);
$badgesAwarded->firstname=$_SERVER['nickname'];
$badgesAwarded->lastname=$_SERVER['sn'];
$badgesAwarded->netid=$_SERVER['cn'];
file_put_contents($file, json_encode($badgesAwarded)); 
}
else{
$file="data/".$person;
$badgesAwarded=json_decode(file_get_contents($file));    
    
if($_SERVER['cn'] == $person){
    $badgesAwarded->isEditable=True;
    
}

}



#print_r($_SERVER['cn']."----".$_POST["person"]  )

print json_encode($badgesAwarded);

?>
