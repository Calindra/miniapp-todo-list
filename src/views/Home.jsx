<Window>
  <View>
    <Input
      inputMode="text"
      type="text"
      mode="danger"
      label="Descrição"
      hint="Preencha corretamente"
      onChange={this.setDescription}
    />

    <Grid>
      <Button
        label={'Inserir'}
        type='primary'
        onClick={this.create}
      />

      <Button
        label={'Apagar Tudo'}
        type='primary'
        onClick={this.delete}
      />

    </Grid>
    <Divisor line />
    {this.state.todoList.map(todo => {
      return (
        <View key={todo._id}>
          <CheckItem
            checked={todo.status}
            onChange={value => {
              this.update(todo, value)
            }}
            text={todo.description} />
        </View>
      )
    })}
  </View>
</Window>
