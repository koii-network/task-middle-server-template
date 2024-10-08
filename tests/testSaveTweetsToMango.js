const saveTweetsToMongoDB = require('../api/saveTweetsToMongoDB');
const { queueCID } = require('../queue');

async function testSaveTweets() {
  const submissionList = [
    'bafybeibvr3gkj6i5sysztsvidizdvngwz4f53h45bubgxzx52s55cnedyi',
    'bafybeicey4he6ba6hvqjtxl2q54xrvbpygem7ijeqbdk4nhu6axciag2di',
    'bafybeiaqmqgittqdhyigacd5xrrdhhul5l7joizqav7yvejq67lqxxlfbi',
    'bafybeifmd76ywx7tawiwn36uqcsbfoebdwxpcho7dwswskktd4vdldj5uu',
    'bafybeihn2ppsoinn4cazncgi2y3i4pudmdfv2vinj7dqz6ajlebzd4a7ay',
    'bafybeie5upuvrrprsrztz5l4z4dux2cprq4w52arnwmca7a7v3fkwzrvom',
    'bafybeidyc4spjhm5p7ihoowhhqlvz5ls2l2jrr2va2xdi4wzixalrx4xl4',
    'bafybeidpgosswtk3e4x4c57jzgsd62srrokf5h3kzv2xu3an2pzkb6upim',
    'bafybeifjsvtjt5tbofteaedfwqsdbls6vmlchyluiczujuxrmo6boxqtbm',
    'bafybeigmtv2m2huqn4xcmukwfqqf3n56zkt7rjzmlol5oj6cy5jnp7aldy',
    'bafybeih7c27tkcvy6sbknjbz3f4e6oiqq24fvsssg656pmukm3rgrnnq6q',
    'bafybeidy6xy66zr7b5zmkwg45fma6td6x5ecmxsry2zwndxcjxcsyhshhu',
    'bafybeihv6ivazpkeully5v2fxmpgwwayc4ri4frwj5ng53r526yn6rekfu',
    'bafybeia4mwaepvzfbevrsy7kzxhnzqdi7jgi7rw6c2p5g26y4sui254e2y',
    'bafybeibmfzsbif6c7b5gu62gnaytuxovmz4bkaywqmzeqdxkzb7etbstyq',
    'bafybeigjwx4vjrgkqgtvs7pcnawvemzvn2nzudnh6hniygeas2pk4eowry',
    'bafybeiendjj3bd3xsv6dzjysxvzx2q4amyfk4cyd7i7veseo76isn2k5vq',
    'bafybeifv35jltypzqwfqpd5fhnwx6djyxtyfzhs7ixkuljh2dcinfhzjom',
    'bafybeiaty4lw4gmcavyrz5mahxtmdjiuum44wtwimd3so7kl6tqvagftna',
    'bafybeibwqewu2qvxqqlxq744t4uwxwdzxdkdf54vb7owj3ybqtt5mgt434',
    'bafybeica42fx7o3xmvrtqinwgwjs6qziqfeasvhkx3zjfrcl22yzswv6oq',
    'bafybeidluvt7k6d63dign42k752iwxpbn36kwksawdciznjh3hzmwtq6fe',
    'bafybeicaq5atygbknbzar6ivsbaakd7we7npkxndajco2wa46qjhjxrzta',
    'bafybeigg62xztntx2laqypzj2wk2oksicpjvxhoqi7n44vsgjsj7ivics4',
    'bafybeieg6l62fqcqn24ybbzjfne6asw5zxfh2qqy3z7n3pozueysqkapgm',
    'bafybeifqkretyutc3noyh2c6x2cyfwlj76vfc4sjffg73riikyccind52m',
    'bafybeieg5amip5h3mkuva73yq3gmfbqd4hrnph4sdf2wvxh6eihwhoea2e',
    'bafybeihbbjzhb7ua2elqvqmvestdhjmfjakucloyfj4ktvofx7rsnacofe',
    'bafybeigsfr4hih636owaw26qwojvtdr3pejvcqzvlomoij3wadztjtvc4q',
    'bafybeieqel2562es7amvad7s4lbyjgk26q6egbyrkkwei2cf5tizg74q4q',
    'bafybeiabiyyz7rnzrpnvljigvufyuz35cazcif3pxwbdgwntpams2jmmfi',
    'bafybeiccxpie2jgimwbe7vhziqwvbcmajezogftjeirsrigxbxrapq3ixi',
    'bafybeicz4jlyrfmnbyekej655rtismkewiz6hgshpfu5t34hwbth4apauy',
    'bafybeiff5bo4d2m2sknszlbo6nknbzfyar7j64gmic4fddvk67wmtnarla',
    'bafybeia3tjf62ht4zqpgl5hhqxhz5p6bfigtyzgiy7d5dclsuylppfo2ma',
    'bafybeihpsf3htm4nz5mkbv4faqecszqfmv7svcplqp2idwkjfqpsz4tsee',
    'bafybeifmduhnjr27wb5wtd37io54pgqhcw34n5p67vw4xoy5p7hs3o2iv4',
    'bafybeieomudibiwfcfyck2ccrvrlx2k3ycvo5bmu54n3ahcn5tcztkkapy',
    'bafybeidbwqtqleh2rd3qgmxxntmcamoxkpyjl776bsdbable7i3bt7glgy',
    'bafybeif7juvynvzlbgey5ncfj6nkz4nepum4igkvw7s6vcp4prhs3rcere',
    'bafybeibxrt3o2iq3nj5vwbwthsx2lxftz7267vbwyemj36ohazvmfcxpki',
    'bafybeihbw3735xnzul25slbkkmvjxeqi4hgqaiwzdsvzihyeu6g5i225vm',
    'bafybeifgsuygvu7law2cdiodkit4itpbdwiynrkuvl2ptfvc6zk737kide',
    'bafybeickglycisgrqsri7neopsng7wua7shbpiihzqyrbcagl6itn7d2fq',
    'bafybeiervcewoxchcruyjhuxl6lkwqn23jlk6s2jfyjlgws3pbicwtctsm',
    'bafybeic5yxqbmljsmngd5db5vat6tmttsj4wpuycrxxgxn6q5bk2ijv7ie',
    'bafybeigms7hnt7qexx7eqako26glljouttmd2n7yki6ndwp7pshgim6jyy',
    'bafybeifzzezwvmdpgxybgvsvcnq7fairxt3ot7asyvbttiqleis2gm4olu',
    'bafybeiaibuvihlswzdmklb24ypjefl5xmrmruqejpsgpfyouz5ynqquvze',
    'bafybeihnkrgyeg3zflxgfd6gi5z6f2pzoaaywioecaqfcn5lypc6cykmpm',
    'bafybeiemyoqvljobwmfuzvnsrboru35iuozhqmsqqp3qk6ncqejgqwiony',
    'bafybeiclr2nj6gys2zazpeaxdl6y6nbarspu32l2g5gsab5bypabz2yvqq',
    'bafybeiex5drwkgbv5ecejn4mb74thlh4wmhbfyfi7sejxexg3qk2rru4om',
    'bafybeifgujavxhj3xrhzfroyoarsmas4lsmev7iznbepxz7iff2ysygv24',
    'bafybeiehyguk6k447jx6lleybli36epxsum7cgex5exuqsz3db3ruattxu',
    'bafybeiawgr5e26r2xalphxue5ls57adsktiwaotnbr6mpnatkh5jrt3jry',
    'bafybeihi5a3bpuqmujcwcukj3ncrz6ocqr7b4xhizrmblo6dvg32objvom',
    'bafybeiew3liqq62s43zd2dzovauqarfh2xutovhjth6e5qtq4k2l7trski',
    'bafybeic4vmudtqvuc5sllruvgnll4usmvdfpswztbceiyu6sdun7ca2rg4',
    'bafybeibq7n5ew5oaj2fqwywbaggwyw74r2n3zga56hv67jzrugrngdn4fq',
    'bafybeigiw4rfhdjmjwbedgrunzu2qhcfpurqhchqpcft4jb3w2wranyd3e',
    'bafybeies5ff4llacqtngjbxj74e2zwzwmzsum54wo3csacvljndoro7pda',
    'bafybeiau4x4hz7edys3jdidx4ucaovznk3q7dxoicqrvw3mf7h73jh5uaq',
    'bafybeibsml6cl6qklo6cbkg5dboofb7tgrtxgqehkgh45njemothyxmgje',
    'bafybeigicnvtcbqmigx2wkvy42aqrmnbl7ayibeg35gzcl6d6gfoqdmj5q',
    'bafybeib2pjjljp4cc7awtdt2ag33ycuetf4z7zp6vyan6qqlsgazswj44q',
    'bafybeibokbecfdfezmmr5oovyhrl3s44crbvw2k4tf22v6sy2ttfc7seoa',
    'bafybeif3ar4fpnphf7evv7zozviy2cenxnsndxfe6wud7xqmntkeh2jqni',
    'bafybeiewz55v6u5ozbmol5ksn5l7dpniostqy45pgirtwjrchd6ty4mqty',
    'bafybeifl7wrguze453qpacntxaqsuoqja6h2uknfdr6g5fuljny4f65yqq',
    'bafybeiag7p33wzjoaw2p3m56t3syet4lvc6j3ckiyi4i3ms5xlitfgq6cy',
    'bafybeiaqxgt4vcm4hyzc4g5xftjlf6zsvjkz5c64vltdkyy3lq7gpzx4ry',
    'bafybeifjihuoculypafvgzcznnlh2idcrkldkrlvvdqllle77uehdmbosu',
    'bafybeiapepq4q4ohkvutvl7wmtty75divhsyldurwvukwlljbxpfiryym4',
    'bafybeid3adq4vgay3ophhymmujv23fospajylvswqlhbnqddq7lri6ibqa',
    'bafybeiebepc4zsv2fi4ev37qzbdg7iuzfqlmvqbx565gdymseedubxl6wa',
    'bafybeiapdmtye36fvzihdkf6jb6a6vf3mrzeyfii6jfkzjbtmbhutevhgm',
    'bafybeig4wte5i36qeuu6jmzaduwhvytegah4lm4xo4grhfrxzpwcdkjvua',
    'bafybeighegqul5vivpc7gsfvaftj377zuwq6umfpnzihob4ldx54nnmwgu',
    'bafybeieg4aev2ysuy6u4h24sjnyrjem27nbzucdsjhaaxpdliuysxuxo24',
    'bafybeier6veda2djpuuumarwwl4x7ybbnvagza4pxc66u5kfacwheenlu4',
    'bafybeiadsib4gnpbnfo2dkuy2wjv3dk4j27wn6ort2vszaxqbysxzdvh6u',
    'bafybeiei2oo3ayldm47z75rygfatotiyljd25n3ungba5mb4pt76q7hc5u',
    'bafybeiag4minstvtoj6ececqb4db2iyb2xher7kcb5zchbsm3gfenhp3pe',
    'bafybeih6jqexcbflrbeasfi2koofh4fxmc3mfesdm3ihzrkymcvoguyyx4',
    'bafybeihohpyarnnsm4geuaaitwbcrpnxdrd5domrxyyptzvxx75qympogi',
    'bafybeiccilkcgnwtfdrx2hn7s5upl3soe2gffjxqfqzw2skwu277mf4kha'
  ] 
  try {
    const tweetList = await queueCID(submissionList);
    console.log('weet list length:', tweetList.length);

    await saveTweetsToMongoDB(tweetList);
    console.log('Tweets saved to MongoDB.');
  } catch (error) {
    console.error('Error:', error);
  }
}

testSaveTweets();