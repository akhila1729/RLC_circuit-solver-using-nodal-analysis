
function parser(n)
{
	var v=document.black.txtNum.value;
	v=v.toLowerCase();
	var num=v.length;
	var total_element=0;
	var m=0;
	var v=zeros2(n,n);
	var e=space2(n,n);
	var rno=zeros2(n,n);
	var total_element=0;
	var c_count=0;
	var l_count=0;
	var r_count=0;
	var v_count=0;
	var let='';
	for(var i=0;i<num;)
	{
		
		if(v[i]=='v'||v[i]=='c'||v[i]=='l'||v[i]=='r')
		{
			total_element++;
			le=v[i];
			if(v[i]=='r')
			{
				r_count++;
			}
			if(v[i]=='c')
			{
				c_count++;
			}
			if(v[i]=='l')
			{
				l_count++;
			}
			if(v[i]=='v')
			{
				v_count++;
			}
			i=i+2;
			for(var j=0;j<5;j++)
			{
			var n11=0;
			var n22=0;
			
			m=0;
			while((v[i]!=' ')||(v[i]!='_'))
			{
				m=m*10+v[i];
				i++;
				
			}
			i=i+2;
			
			if(j==0)
			{
				n11=m;
			}
			if(j==1)
			{
				n22=m;
			}
			if(j==2)
			{
				v[n11][n22]=m;
			}
			if(j==3)
			{
				e[n11][n22]=m;
			}
			if(j==4)
			{
				if(le=='r')
				rno[n11][n22]=m;
				if(le=='c')
				cap[n11][n22]=m;
				if(le=='l')
				induc[n11][n22]=m;
				if(le=='v')
				volt[n11][n22]=m;
		    
		    }
		    }
		}
	}
	var test=
	{
		t:total_element,
		e:e,
		v:v,
		eno:eno,
		cap:cap,
		induc:induc,
		volt:volt,
		rno:rno,
		r_count:r_count,
		l_count:l_count,
		c_count:c_count,
		v_count:v_count
	}
	return test;
	
	
}


		
			
			
			
			
			
				
				
			
