<?
header("Content-type: text/csv");
header("Content-Disposition: attachment; filename=badges.csv");
header("Pragma: no-cache");
header("Expires: 0");
$files = glob("data/*");

#print_r(json_decode(file_get_contents($files)));
$scores= array();



$headerRaw = (array) json_decode(file_get_contents($files[0]));
$header =array_keys($headerRaw);
$headerString = implode(",",$header);
//print $headerString;
print $headerString;
    print"\n";
foreach ($files as $file){
    #print $file;
    #$contents = json_decode(file_get_contents($file));
    #contents is $file turned into a native php file
    #print_r($contents);
    
    //print $file;
    $filetext = (array) json_decode((file_get_contents($file)));
    $filetextHeader = array_values($filetext);
    $filetextString = implode(",", $filetextHeader);
    //print $filetext;
//    
//    print "\n";
//    nl2br();
    $filetextData = list($a, $b, $c, $d, $e, $f, $g, $h, $i, $j) = explode(",", $filetextString);
//    print $i;
    
    foreach ($header as $key){
        print_r($filetext[$key].",");
    }
    print"\n";
    //foreach ($filetext as $text)
        //print $text;
                                    
   
    
}



?>
