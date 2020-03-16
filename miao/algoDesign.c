insertion_sort(item s[], int n)
{
  int i, j; /* counters */
  for (i = 1; i < n; i++)
  {
    j = i;
    while ((j > 0) && (s[j] < s[j - 1]))
    {
      swap(&s[j], &s[j - 1]);
      j = j - 1;
    }
  }
}

selection_sort(int s[], int n)
{
  int j;
  int min;

  for (int i = 0; i < n; i++)
  {
    min = i;
    for (j = i + 1; j < n; j++)
    {
      if (s[j] < s[min])
        min = j;
      swap(&s[i], &s[min]);
    }
  }
}

int findmatch(char *p, char *t)
{
  int i, j; /* counters */
  int m, n; /* string lengths */

  m = strlen(p);
  n = strlen(t);
  // n >= m 
  for (i = 0; i <= (n - m); i++)
  {
    j = 0;
    while ((j < m) && (t[i + j] == p[j]))
      j = j + 1;
    if (j == m)
      return (i);
  }
  return (-1);
}
