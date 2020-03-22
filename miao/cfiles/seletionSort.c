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
