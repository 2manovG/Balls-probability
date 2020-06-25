//get value of ksi
function getKsi(m, r, l)
{
	//set of balls
	let balls = [];
	for (let i = 0; i < m; i++) balls.push(0); //white balls
	for (let i = 0; i < r; i++) balls.push(1); //black balls
	
	//find value of ksi
	let ksi = 0;
	for (let i = 0; i < l; i++)
	{
		//remove random ball and add it's value to ksi
		ksi += balls.splice(Math.floor(Math.random() * balls.length), 1)[0];
	}
	return ksi;
}

//carry out n experiments
function experiment(m, r, l, n) //generate array [v1, v2, ..., vn]
{
	let successes = 0; //ammount of successfull experiments
	let v = []; //array of frequences
	
	for (let i = 1; i <= n; i++)
	{
		//we need to add to successes variable 1 if A and 0 if not A
		//A means ksi is odd
		//so we just add (ksi mod 2) to successes each time
		successes += getKsi(m, r, l) % 2;
		v.push(successes / i);
	}
	return v;
}

//now we need to find propper value of probability
//find C(k, n)
function C(k, n)
{
	let c = 1;
	for (let i = 1; i <= k; i++) c *= (n - k + i) / i;
	return c;
}
//find P(ksi = k)
function Pk(m, r, l, k)
{
	if (k < l-m || k > r || k > l) return 0;
	return C(l-k,m)*C(k,r)/C(l,m+r);
}
//find P(A)
function probability(m, r, l)
{
	let b1 = Math.max(1, Math.floor((l - m) / 2) * 2 + 1);
	let b2 = Math.floor((Math.min(r, l) + 1) / 2) * 2 - 1;
	
	let p = 0; //probability
	for (let k = b1; k <= b2; k += 2) p += Pk(m, r, l, k);
	return p;
}

//find n, from which...
function checkN(n, N, v, p, eps)
{
	for (let i = n; i < n + N; i++)
		if (Math.abs(v[i] - p) > eps) return false;
	return true;
}
function findN(N, v, p, eps)
{
	for (let i = 0; i < v.length - N; i++)
		if (checkN(i, N, v, p, eps)) return i;
	return undefined;
}