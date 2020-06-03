function xyz()
{
	var node=document.black.txtNum1.value;
	var test=parser(node);
	var t=test.total_element;
	var e=test.e;	
	var val=test.v;
	var rno=test.rno;
	var cap=test.cap;
	var induc=test.induc;
	var volt=test.volt;
	var count_r=test.r_count;
	var count_l=test.l_count;
	var count_c=test.c_count;
	var count_v=test.v_count;
	n=node+c_count+l_count+v_count-1;
	var main=zeros2(n,n);
    var res=zeros2(n,1);
    var find=math.zeros(n,1);
    var h=1/10000.0;
    
    var current=[];
    var time=[];
    
    for (i=0;i<10;i++) 
    {
  current[i]=0;
  time[i]=0;
  
}
    for(var i=1;i<node;i++)
    {
    for(var j=0;j<node;j++)
    {
        if(e[i][j]=='r')
        {
            
            main[i-1][i-1]=main[i-1][i-1]+1/val[i][j];
            if(j!=0)
            {
                main[i-1][j-1]=main[i-1][j-1]-1/val[i][j];
            }
		}
        
        if(e[j][i]=='r')
            {
            main[i-1][i-1]=main[i-1][i-1]+1/val[j][i];
            if(j!=0)
            {
                main[i-1][j-1]=main[i-1][j-1]-1/val[j][i];
            }}
        
        if(e[i][j]=='c')
            {
            main[i-1][node-1+cap[i][j]]=main[i-1][node-1+cap[i][j]]+1;
            main[node-1+cap[i][j]][i-1]=main[node-1+cap[i][j]][i]+1/h;
            if(j!=0){
                main[node-1+cap[i][j]][j-1]=main[node-1+cap[i][j]][j-1]-1/h;}
            main[node-1+cap[i][j]][node-1+cap[i][j]]=-1/val[i][j];
		}
        if(e[j][i]=='c')
            {
            main[i-1][node-1+cap[j][i]]=main[i-1][node-1+cap[j][i]]-1;
            main[node-1+cap[j][i]][i-1]=main[node-1+cap[j][i]][i-1]-1/h;
            if(j!=0)
            {
                main[node-1+cap[j][i]][j-1]=main[node-1+cap[j][i]][j-1]+1/h;}
            main[node-1+cap[j][i]][node-1+cap[j][i]]=main[node-1+cap[j][i]][node-1+cap[j][i]]-1/val[j][i];
		}
            
        if(e[i][j]=='l')
           {
            main[i-1][node-1+induc[i][j]+c_count]=main[i-1][node-1+induc[i][j]+c_count]+1;
            main[node-1+c_count+induc[i][j]][i-1]=main[node-1+c_count+induc[i][j]][i-1]+1;
            if(j!=0)
            {
                main[node-1+c_count+induc[i][j]][j-1]=main[node-1+c_count+induc[i][j]][j-1]-1;}
            main[node-1+c_count+induc[i][j]][node-1+c_count+induc[i][j]]=-val[i][j]/h
		}
        if(e[j][i]=='l')
            {
            main[i-1][node-1+induc[j][i]+c_count]=main[i-1][node-1+induc[j][i]+c_count]-1;
            main[node-1+c_count+induc[j][i]][i-1]=main[node-1+c_count+induc[j][i]][i-1]-1;
            if(j!=0)
                main[node-1+c_count+induc[j][i]][j-1]=main[node-1+c_count+induc[j][i]][j-1]+1;
            main[node-1+c_count+induc[j][i]][node-1+c_count+induc[j][i]]=-val[j][i]/h;
		}
            
        if(e[i][j]=='v')
           { 
            main[i-1][node-1+c_count+l_count+volt[i][j]]=1;
            main[node-1+c_count+l_count+volt[i][j]][i-1]=1;
            if(j!=0)
            {
                main[node-1+c_count+l_count+volt[i][j]][j-1]=-1;}
            
		  }  
        if(e[j][i]=='v')
            {
            main[i-1][node-1+c_count+l_count+volt[j][i]]=-1;
            main[node-1+c_count+l_count+volt[j][i]][i-1]=1;
            if(j!=0)
            {
                main[node-1+c_count+l_count+volt[j][i]][j-1]=-1;}
            

}
}
}
var z=math.matrix(main);
var w=math.matrix(res);
var y=math.inv(z);
find=math.matrix(find);

var m=0;
function compute()
{
    res=zeros2(n,1);
    for(var i=1;i<node;i++)
    {
        for(var j=0;j<node;j++) 
            {if(e[i][j]=='c')
				{
                if(j!=0){
                    res[node-1+cap[i][j]]=res[node-1+cap[i][j]]+(find.get([i-1],0)-find.get([j-1,0]))/h;}
                if(j==0){
                    res[node-1+cap[i][j]]=res[node-1+cap[i][j]]+(find.get([i-1,0]))/h;}
                   } 
            if(e[j][i]=='c')
            {
                if(j!=0)
                   { res[node-1+cap[j][i]]=res[node-1+cap[j][i]]+(find.get([j-1,0])-find.get([i-1,0]))/h;}
                if(j==0)
                {
                    res[node-1+cap[j][i]]=res[node-1+cap[j][i]]+(-find.get([i-1],0))/h;}
				}
                    
            if(e[i][j]=='l')
            {
                res[node-1+c_count+induc[i][j]]=-val[i][j]*find.get([(node-1+c_count+induc[i][j]),0])/h;
			}
                
            if(e[j][i]=='l')
            {
                res[node-1+c_count+induc[j][i]]=-val[j][i]*find.get([(node-1+c_count+induc[j][i]),0])/h;
			}
                
            if(e[i][j]=='v')
            {
                res[node-1+c_count+l_count+volt[i][j]]=-val[i][j];}
                
            if(e[j][i]=='v')
            {
                res[node-1+c_count+l_count+volt[j][i]]=val[j][i];
			}
      }}      
    var w=math.matrix(res); 
      
    find=math.multiply(y,w);
    
    current[m]=find.get([0,0]);
    time[m]=m*h;;
    m++;
}
Plotly.newPlot('myDiv',[{
  x:x,
  y:z,
  mode:'markers'
}], {
  xaxis:{range:[0,10]},
  yaxis: {range:[0,1]}
})

function update() {
  compute();

  Plotly.animate('myDiv',{
    data:[{x: x, y: z}]
  }, {
    transition:{
      duration:0
    },
    frame:{
      duration:0,
      redraw:false
    }
  });

  requestAnimationFrame(update);
}

requestAnimationFrame(update);

}

