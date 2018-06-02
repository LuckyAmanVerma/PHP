#include<stdio.h>
#include<stdlib.h>
struct node
{
  int data;
  struct node* prev;
  struct node* next;
};
struct node* start=NULL;
void insertLast(int data)
{
  struct node *temp;
  temp=(struct node*)malloc(sizeof(struct node*));
  temp->data=data;
  temp->next=NULL;
  if(start==NULL)
  {
      start=temp;
      temp->prev=NULL;
  }
  else
  {
  struct node *head;
  head=start;
  while(head->next!=NULL)
    head=head->next;
  temp->prev=head->next;
  head->next=temp;

  }
}
void deleteLast()
{
  if(start==NULL)
    printf("Nothing to delete\n");
  struct node *temp;
  temp=start;
  while(temp->next!=NULL)
   temp=temp->next;
  if(start->next==NULL)
  start=NULL;
  else
  {
    temp->prev->next=NULL;
  free(temp);
}
}
void display()
{
  if(start==NULL)
  printf("Nothing to display\n");
  else
  {
    while(start!=NULL)
    {
    printf("the data is :%d\n",start->data);
    start=(start->next);
    }
  }
}
int choose()
{
  int ch;
  printf("Enter ur choice\n");
  printf("1) Insert Last\n");
  printf("2)Delete Last\n");
  printf("3)Display\n");
  printf("4)Exit\n");
  scanf("%d",&ch);
  return(ch);
  }

void main()
{
  while(1)
  {
switch(choose())
{
  int val;
  case 1:
    printf("Enter the value u want to Enter\n");
    scanf("%d",&val);
    insertLast(val);
    break;
  case 2:
  deleteLast();
  break;
  case 3:
  display();
  break;
  case 4:
  exit(0);
  break;
  default:
    printf("Invalid Option");
}
}
}
