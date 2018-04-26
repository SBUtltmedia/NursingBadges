<?
header("Content-type: text/csv");
header("Content-Disposition: attachment; filename=badges.csv");
header("Pragma: no-cache");
header("Expires: 0");
$files = glob("data/*");

#print_r(json_decode(file_get_contents($files)));
$scores= array();



$header = json_decode(file_get_contents($files[0]));
$headerMerged= (object) array_merge((array) $header->badgesAwarded, (array) $header->info);
//print_r((array) $headerMerged);
$headerKeys=array_keys((array) $headerMerged);
$headerString = implode(",",$headerKeys);
print $headerString;
//print $headerString;
    print"\n";

foreach ($files as $file){
    #print $file;
    #$contents = json_decode(file_get_contents($file));
    #contents is $file turned into a native php file
    #print_r($contents);
    
    //print $file;
    $filetext =  json_decode((file_get_contents($file))); 
    $rowMerged= (object) array_merge((array) $filetext->badgesAwarded, (array) $filetext->info);
    foreach($headerMerged as $key => $value) {
print $rowMerged->$key.",";
}
print"\n";
}
   
    


?>
